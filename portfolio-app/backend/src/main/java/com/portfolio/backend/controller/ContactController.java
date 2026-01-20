package com.portfolio.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.backend.dto.ContactFormDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "${cors.allowed-origins}", allowCredentials = "true")
public class ContactController {
    
    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    private static final String RECIPIENT_EMAIL = "bduggirala2@huskers.unl.edu";
    private static final String POSTMARK_ENDPOINT = "https://api.postmarkapp.com/email";

    @Value("${postmark.server.token:}")
    private String postmarkServerToken;
    
    @Value("${postmark.from.email:}")
    private String fromEmail;
    @Value("${postmark.message.stream:outbound}")
    private String postmarkMessageStream;

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public ContactController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendContactEmail(@RequestBody ContactFormDto contactForm) {
        try {
            // Log incoming request and configuration
            logger.info("Starting email send process...");
            logger.debug("From email configured as: {}", fromEmail);
            logger.debug("Postmark server token present: {}", postmarkServerToken != null && !postmarkServerToken.isBlank());
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

            if (postmarkServerToken == null || postmarkServerToken.isBlank()) {
                logger.error("Postmark server token is not configured.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Postmark server token is not configured"));
            }

            if (fromEmail == null || fromEmail.isBlank()) {
                logger.error("Postmark from email is not configured.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Postmark from email is not configured"));
            }

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
            
            Map<String, Object> payload = new HashMap<>();
            payload.put("From", fromEmail);
            payload.put("To", RECIPIENT_EMAIL);
            payload.put("Subject", subject);
            payload.put("HtmlBody", emailContent.toString());
            payload.put("MessageStream", postmarkMessageStream);

            if (contactForm.isWantsReply() && contactForm.getEmail() != null && !contactForm.getEmail().trim().isEmpty()) {
                payload.put("ReplyTo", contactForm.getEmail().trim());
            }

            String body = objectMapper.writeValueAsString(payload);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(POSTMARK_ENDPOINT))
                    .header("Accept", "application/json")
                    .header("Content-Type", "application/json")
                    .header("X-Postmark-Server-Token", postmarkServerToken)
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            logger.info("Sending email to Postmark...");
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            logger.info("Postmark response status code: {}", response.statusCode());
            logger.debug("Postmark response body: {}", response.body());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                logger.info("Email sent successfully");
                Map<String, String> successResponse = new HashMap<>();
                successResponse.put("message", "Message sent successfully");
                return ResponseEntity.ok(successResponse);
            } else {
                logger.error("Postmark error response body: {}", response.body());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Failed to send email. Status code: " + response.statusCode()));
            }
        } catch (IOException e) {
            logger.error("Error sending email: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to send email: " + e.getMessage()));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Email send interrupted: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to send email: " + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred: " + e.getMessage()));
        }
    }
} 
