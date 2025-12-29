package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactFormDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    
    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    private static final String DUMMY_KEY = "dummy-key-for-development";

    @Value("${postmark.server.token}")
    private String postmarkServerToken;

    @Value("${postmark.from.email}")
    private String fromEmail;

    @Value("${email.test.enabled:false}")
    private boolean emailTestEnabled;
    
    // No additional constructor injection currently required

    @PostMapping("/send")
    public ResponseEntity<?> sendContactEmail(@RequestBody ContactFormDto contactForm) {
        try {
            // Log incoming request and configuration
            logger.info("Starting email send process...");
            logger.debug("From email configured as: {}", fromEmail);
            logger.debug("Postmark server token present: {}", postmarkServerToken != null);
            logger.info("Received contact form submission from: {}", contactForm.getName());
            
            // Validate required fields
            if (contactForm.getName() == null || contactForm.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Name is required"));
            }
            if (contactForm.getSubject() == null || contactForm.getSubject().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Subject is required"));
            }
            if (contactForm.getMessage() == null || contactForm.getMessage().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Message is required"));
            }
            if (contactForm.isWantsReply() && (contactForm.getEmail() == null || contactForm.getEmail().trim().isEmpty())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email is required when requesting a reply"));
            }

            // Short-circuit for test mode without calling Postmark
            if (emailTestEnabled) {
                logger.warn("Email test mode enabled. Skipping Postmark send and returning success.");
                return ResponseEntity.ok(Map.of("message", "Message accepted (test mode)", "test_mode", true));
            }

            // Check if we're in development mode with dummy key
            if (DUMMY_KEY.equals(postmarkServerToken)) {
                logger.warn("Running in development mode with dummy Postmark token. Email will not be sent.");
                logger.info("Would have sent email with content: Subject='{}', To='{}', From='{}'", 
                    contactForm.getSubject(), "bduggirala2@huskers.unl.edu", fromEmail);
                return ResponseEntity.ok(Map.of(
                    "message", "Message logged (development mode - email not sent)",
                    "development_mode", true
                ));
            }

            // Prepare email fields for Postmark
            String toEmail = "bduggirala2@huskers.unl.edu";
            String subject = "[Portfolio Contact] " + contactForm.getSubject();
            
            // Format the email content
            StringBuilder emailContent = new StringBuilder();
            emailContent.append("<h2>New Contact Form Submission</h2>");
            emailContent.append("<p><strong>Name:</strong> ").append(contactForm.getName()).append("</p>");
            
            if (contactForm.getCompany() != null && !contactForm.getCompany().trim().isEmpty()) {
                emailContent.append("<p><strong>Company:</strong> ").append(contactForm.getCompany()).append("</p>");
            }
            
            emailContent.append("<p><strong>Subject:</strong> ").append(contactForm.getSubject()).append("</p>");
            
            emailContent.append("<p><strong>Message:</strong></p>");
            emailContent.append("<div style='padding: 15px; background-color: #f5f5f5; border-radius: 5px; margin: 10px 0;'>");
            emailContent.append("<p>").append(contactForm.getMessage().replace("\n", "<br/>")).append("</p>");
            emailContent.append("</div>");
            
            if (contactForm.isWantsReply()) {
                emailContent.append("<h3 style='color: #2563eb; margin-top: 20px;'>Contact Details for Reply:</h3>");
                
                if (contactForm.getEmail() != null && !contactForm.getEmail().trim().isEmpty()) {
                    emailContent.append("<p><strong>Email:</strong> <a href='mailto:").append(contactForm.getEmail()).append("'>")
                              .append(contactForm.getEmail()).append("</a></p>");
                }
                
                if (contactForm.getPhone() != null && !contactForm.getPhone().trim().isEmpty()) {
                    emailContent.append("<p><strong>Phone:</strong> ").append(contactForm.getPhone()).append("</p>");
                }
            }
            
            // Build Postmark request
            Map<String, Object> payload = new HashMap<>();
            payload.put("From", fromEmail);
            payload.put("To", toEmail);
            payload.put("Subject", subject);
            payload.put("HtmlBody", emailContent.toString());
            payload.put("MessageStream", "outbound");
            if (contactForm.isWantsReply() && contactForm.getEmail() != null && !contactForm.getEmail().trim().isEmpty()) {
                payload.put("ReplyTo", contactForm.getEmail().trim());
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));
            headers.set("X-Postmark-Server-Token", postmarkServerToken);

            HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(payload, headers);
            RestTemplate restTemplate = new RestTemplate();

            try {
                logger.info("Sending email via Postmark...");
                ResponseEntity<Map<String, Object>> postmarkResponse = restTemplate.exchange(
                        "https://api.postmarkapp.com/email",
                        HttpMethod.POST,
                        httpEntity,
                        new ParameterizedTypeReference<Map<String, Object>>() {}
                );

                int status = postmarkResponse.getStatusCode().value();
                logger.info("Postmark response status code: {}", status);

                if (status >= 200 && status < 300) {
                    Map<String, Object> body = postmarkResponse.getBody();
                    Object errorCode = body != null ? body.get("ErrorCode") : null;
                    if (errorCode instanceof Number && ((Number) errorCode).intValue() == 0) {
                        Map<String, String> successResponse = new HashMap<>();
                        successResponse.put("message", "Message sent successfully");
                        return ResponseEntity.ok(successResponse);
                    } else {
                        String message = body != null ? String.valueOf(body.get("Message")) : "Unknown error";
                        logger.error("Postmark error: {}", message);
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(Map.of("error", "Failed to send email: " + message));
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(Map.of("error", "Failed to send email. Status code: " + status));
                }
            } catch (HttpStatusCodeException ex) {
                logger.error("Postmark HTTP error: status={}, body={}", ex.getStatusCode().value(), ex.getResponseBodyAsString());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Failed to send email: HTTP " + ex.getStatusCode().value()));
            }
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred: " + e.getMessage()));
        }
    }
} 