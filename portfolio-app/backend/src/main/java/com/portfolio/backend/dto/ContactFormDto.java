package com.portfolio.backend.dto;

public class ContactFormDto {
    private String name;
    private String company;
    private String email;
    private String subject;
    private String message;
    private boolean wantsReply;
    private String phone;
    private String recipientEmail;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isWantsReply() {
        return wantsReply;
    }

    public void setWantsReply(boolean wantsReply) {
        this.wantsReply = wantsReply;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    @Override
    public String toString() {
        return "ContactFormDto{" +
                "name='" + name + '\'' +
                ", company='" + company + '\'' +
                ", email='" + email + '\'' +
                ", subject='" + subject + '\'' +
                ", message='" + (message != null ? message.substring(0, Math.min(50, message.length())) + "..." : "null") + '\'' +
                ", wantsReply=" + wantsReply +
                ", phone='" + phone + '\'' +
                '}';
    }
} 