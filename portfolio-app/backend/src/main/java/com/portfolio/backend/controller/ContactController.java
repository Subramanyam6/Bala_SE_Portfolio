package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactFormDto;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "${cors.allowed-origins}", allowCredentials = "true")
public class ContactController {
    
    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    private static final String DUMMY_KEY = "dummy-key-for-development";

    @Value("${sendgrid.api.key}")
    private String sendgridApiKey;

    @Value("${sendgrid.from.email}")
    private String fromEmail;
    
    private final Environment environment;
    
    public ContactController(Environment environment) {
        this.environment = environment;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendContactEmail(@RequestBody ContactFormDto contactForm) {
        try {
            // Log incoming request and configuration
            logger.info("Starting email send process...");
            logger.debug("From email configured as: {}", fromEmail);
            logger.debug("SendGrid API key present: {}", sendgridApiKey != null);
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

            // Check if we're in development mode with dummy key
            if (DUMMY_KEY.equals(sendgridApiKey)) {
                logger.warn("Running in development mode with dummy SendGrid key. Email will not be sent.");
                logger.info("Would have sent email with content: Subject='{}', To='{}', From='{}'", 
                    contactForm.getSubject(), "bduggirala2@huskers.unl.edu", fromEmail);
                return ResponseEntity.ok(Map.of(
                    "message", "Message logged (development mode - email not sent)",
                    "development_mode", true
                ));
            }

            // Create the SendGrid email
            Email from = new Email(fromEmail);
            Email to = new Email("bduggirala2@huskers.unl.edu");
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
            
            Content content = new Content("text/html", emailContent.toString());
            Mail mail = new Mail(from, subject, to, content);
            
            // Send the email using SendGrid
            SendGrid sg = new SendGrid(sendgridApiKey);
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            
            logger.info("Sending email to SendGrid...");
            Response response = sg.api(request);
            logger.info("SendGrid response status code: {}", response.getStatusCode());
            logger.debug("SendGrid response headers: {}", response.getHeaders());
            
            if (response.getStatusCode() >= 200 && response.getStatusCode() < 300) {
                logger.info("Email sent successfully");
                Map<String, String> successResponse = new HashMap<>();
                successResponse.put("message", "Message sent successfully");
                return ResponseEntity.ok(successResponse);
            } else {
                logger.error("SendGrid error response body: {}", response.getBody());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Failed to send email. Status code: " + response.getStatusCode()));
            }
        } catch (IOException e) {
            logger.error("Error sending email: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to send email: " + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred: " + e.getMessage()));
        }
    }
} 