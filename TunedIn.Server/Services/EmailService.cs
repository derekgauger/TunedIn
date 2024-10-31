using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
public class EmailService
{
  private readonly EmailSettings _emailSettings;
  private readonly EmailTemplateService _templateService;

  public EmailService(IOptions<EmailSettings> emailSettings)
  {
    _emailSettings = emailSettings.Value;
    _templateService = new EmailTemplateService();
  }

  public void SendTemplatedEmail(string templateName, string to, Dictionary<string, string> parameters)
  {
    var template = _templateService.GetTemplate(templateName);
    var body = _templateService.ProcessTemplate(templateName, parameters);
    var subject = _templateService.ProcessSubject(templateName, parameters);

    using (var client = new SmtpClient(_emailSettings.MailServer, _emailSettings.MailPort))
    {
      client.UseDefaultCredentials = false;
      client.Credentials = new NetworkCredential(_emailSettings.Sender, _emailSettings.Password);
      client.EnableSsl = true;

      var mailMessage = new MailMessage
      {
        From = new MailAddress(_emailSettings.Sender, "Tuned In Athelete Development"),
        Subject = subject,
        Body = body,
        IsBodyHtml = false
      };
      mailMessage.To.Add(to);

      client.Send(mailMessage);
    }
  }

  // Keep the original SendEmail method for backward compatibility
  public void SendEmail(string to, string subject, string body, string senderEmail, string senderName)
  {
    var parameters = new Dictionary<string, string>
    {
      ["SenderName"] = senderName,
      ["SenderEmail"] = senderEmail,
      ["Subject"] = subject,
      ["Body"] = body
    };

    SendTemplatedEmail("contact", to, parameters);
  }
}
