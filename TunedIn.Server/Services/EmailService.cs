using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using TunedIn.Server.Services;
public class EmailService
{
  private readonly EmailSettings _emailSettings;
  private readonly EmailTemplateService _templateService;
  private readonly ILoggingService _loggingService;

  public EmailService(IOptions<EmailSettings> emailSettings, ILoggingService loggingService)
  {
    _emailSettings = emailSettings.Value;
    _templateService = new EmailTemplateService();
    _loggingService = loggingService;
  }

  public void SendTemplatedEmail(string templateName, string to, Dictionary<string, string> parameters)
  {
    var template = _templateService.GetTemplate(templateName);
    var body = _templateService.ProcessTemplate(templateName, parameters);
    var subject = _templateService.ProcessSubject(templateName, parameters);

    if (new List<string> { "contact", "passwordReset" }.Contains(templateName))
    {
      parameters.Add("Recipient", to);
    }
    var logMessage = _templateService.ProcessLogMessage(templateName, parameters);
    _loggingService.AddLog(template.LogType, logMessage);

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
}
