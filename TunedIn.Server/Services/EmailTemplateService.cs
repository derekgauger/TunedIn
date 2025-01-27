using System.Collections.Generic;

public class EmailTemplate
{
  public string Name { get; set; }
  public string Subject { get; set; }
  public string BodyTemplate { get; set; }
  public string LogType { get; set; }
  public string LogMessage { get; set; }
}

public class EmailTemplateService
{
  private readonly Dictionary<string, EmailTemplate> _templates;

  public EmailTemplateService()
  {
    _templates = new Dictionary<string, EmailTemplate>
    {
      ["contact"] = new EmailTemplate
      {
        Name = "contact",
        Subject = "{Subject}",
        BodyTemplate = "From: {SenderName} ({SenderEmail})\n\n{Body}",
        LogType = "Contact",
        LogMessage = "{SenderName} ({SenderEmail}) sent a message to {Recipient} with the subject '{Subject}'",

      },
      ["welcome"] = new EmailTemplate
      {
        Name = "welcome",
        Subject = "Welcome to Our Platform",
        BodyTemplate = "Hi {Username},\n\nWelcome to our fitness training platform. We are exited to have you. Contact us to start a conversation about how we can help you reach your goals. To help us better understand you, fill out your profile information at https://www.tunedinathlete.com/profile.\n\nBest regards,\nThe Trainers",
        LogType = "Welcome Email",
        LogMessage = "Sent welcome email to {Username}"

      },
      ["changeMembershipRequest"] = new EmailTemplate
      {
        Name = "changeMembershipRequest",
        Subject = "Change Of Membership Request : {Username}",
        BodyTemplate = "{Username} has requested to change their membership from {CurrentMembership} to {RequestedMembership}. Please review the request and take appropriate action. You can contact the user at {Email} or {PhoneNumber}. If the user is requesting an upgrade/pricer membership, they shall be charged the difference in price. If the user is requesting a downgrade, they shall continue receiving the higher tier until the next pay cycle. Please make sure to update the user's membership status in the system. Log into the website to manage the user's membership status.",
        LogType = "Membership Change Request",
        LogMessage = "Received membership change request from {Username} to change their membership from {CurrentMembership} to {RequestedMembership}"

      },
      ["cancelMembershipRequest"] = new EmailTemplate
      {
        Name = "cancelMembershipRequest",
        Subject = "Membership Cancellation Request : {Username}",
        BodyTemplate = "{Username} has requested to cancel their {Membership} membership. Please review the request and take appropriate action. You can contact the user at {Email} or {PhoneNumber}. The user will continue to receive their current membership until the next pay cycle. Please make sure to update the user's membership status in the system. Log into the website to manage the user's membership status.",
        LogType = "Membership Cancellation Request",
        LogMessage = "Received membership cancellation request from {Username} to cancel their {Membership} membership"
      },
      ["membershipChanged"] = new EmailTemplate
      {
        Name = "membershipChanged",
        Subject = "Tuned In Membership Changed",
        BodyTemplate = "Hi {Username},\n\nYour membership has been changed from {OldMembership} to {NewMembership}. If you have any questions, please contact us at {Email} or {PhoneNumber}.\n\nBest regards,\nThe Trainers",
        LogType = "Membership Changed",
        LogMessage = "Sent membership changed from {OldMembership} to {NewMembership} notification to {Username}"
      },
      ["membershipCancelled"] = new EmailTemplate
      {
        Name = "membershipCancelled",
        Subject = "Tuned In Membership Cancellation",
        BodyTemplate = "Hi {Username},\n\nYour membership has been canceled. If you have any questions, please contact us at {Email} or {PhoneNumber}.\n\nBest regards,\nThe Trainers",
        LogType = "Membership Cancelled",
        LogMessage = "Sent membership cancellation notification to {Username}"
      },
      ["passwordChanged"] = new EmailTemplate
      {
        Name = "passwordChanged",
        Subject = "Password Changed",
        BodyTemplate = "Hi {Username},\n\nYour password has been changed. If you did not make this change, please contact us immediately.\n\nBest regards,\nThe Trainers",
        LogType = "Password Changed",
        LogMessage = "Sent password changed notification to {Username}"
      },
      ["emailVerificationCode"] = new EmailTemplate
      {
        Name = "emailVerificationCode",
        Subject = "Email Verification Code",
        BodyTemplate = "Hi,\n\nYour email verification code is {VerificationCode}. Please enter this code in the verification page to verify your email address.\n\nBest regards,\nThe Trainers",
        LogType = "Email Verification Code",
        LogMessage = "Sent email verification code to {Username}"
      },
      ["passwordReset"] = new EmailTemplate
      {
        Name = "passwordReset",
        Subject = "Password Reset",
        BodyTemplate = "Hi,\n\nYour password has been reset. If you did not make this change, please contact us immediately.\n\nBest regards,\nThe Trainers",
        LogType = "Password Reset",
        LogMessage = "Sent password reset notification to {Recipient}"
      }
    };
  }

  public EmailTemplate GetTemplate(string templateName)
  {
    if (!_templates.ContainsKey(templateName))
    {
      throw new KeyNotFoundException($"Email template '{templateName}' not found.");
    }
    return _templates[templateName];
  }

  public string ProcessTemplate(string templateName, Dictionary<string, string> parameters)
  {
    var template = GetTemplate(templateName);
    string processedBody = template.BodyTemplate;

    foreach (var param in parameters)
    {
      processedBody = processedBody.Replace($"{{{param.Key}}}", param.Value);
    }

    return processedBody;
  }

  public string ProcessSubject(string templateName, Dictionary<string, string> parameters)
  {
    var template = GetTemplate(templateName);
    string processedSubject = template.Subject;

    foreach (var param in parameters)
    {
      processedSubject = processedSubject.Replace($"{{{param.Key}}}", param.Value);
    }

    return processedSubject;

  }
  public string ProcessLogMessage(string templateName, Dictionary<string, string> parameters)
  {
    var template = GetTemplate(templateName);
    string processedLogMessage = template.LogMessage;

    foreach (var param in parameters)
    {
      processedLogMessage = processedLogMessage.Replace($"{{{param.Key}}}", param.Value);
    }

    return processedLogMessage;
  }
}
