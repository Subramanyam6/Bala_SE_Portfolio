package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactFormDto;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Value("${sendgrid.api.key}")
    private String sendgridApiKey;

    @Value("${sendgrid.from.email}")
    private String fromEmail;

    @PostMapping("/send")
    public ResponseEntity<?> sendContactEmail(@RequestBody ContactFormDto contactForm) {
        try {
            // Log incoming request
            System.out.println("Received contact form submission: " + contactForm.toString());
            
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

            // Create the SendGrid email
            Email from = new Email(fromEmail);
            Email to = new Email("bduggirala2@huskers.unl.edu"); // Hardcode the recipient email for security
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
            
            System.out.println("Sending email to SendGrid...");
            Response response = sg.api(request);
            System.out.println("SendGrid response status code: " + response.getStatusCode());
            
            if (response.getStatusCode() >= 200 && response.getStatusCode() < 300) {
                System.out.println("Email sent successfully");
                Map<String, String> successResponse = new HashMap<>();
                successResponse.put("message", "Message sent successfully");
                return ResponseEntity.ok(successResponse);
            } else {
                System.out.println("SendGrid error: " + response.getBody());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Failed to send email: " + response.getBody()));
            }
        } catch (IOException e) {
            System.err.println("Error sending email: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to send email: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred: " + e.getMessage()));
        }
    }
} 