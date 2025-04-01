namespace FitTrackAPI.Models
{
    public class Book
    {
        public int Id { get; set; }          // Уникальный ID
        public string Title { get; set; }    // Название
        public string Author { get; set; }   // Автор
        public int Pages { get; set; }       // Кол-во страниц
        public double FileSize { get; set; } // Размер файла в MB
    }
}
