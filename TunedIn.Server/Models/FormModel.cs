public class FormModel
{
  public int Id { get; set; }
  public string FileName { get; set; }
  public string ContentType { get; set; }
  public byte[] FileContent { get; set; }
  public long FileSize { get; set; }
  public DateTime UploadDate { get; set; }
}