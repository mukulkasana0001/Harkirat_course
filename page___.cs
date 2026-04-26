

///////// UI-- Program.cs
using Microsoft.Extensions.Configuration;
using Shared.Const;
using UI.Menu;
using Utilities;
using static Shared.Const.emuns;

class Program
{
    static async Task Main(string[] args)
    {
         string s = await EmailSender.SendOrderConfirmation( "mukulkasana0001@gmail.com");
        Console.WriteLine(s);
        bool running = true;
        while (running)
        {
            if (!SessionManager.IsLoggedIn)
            {
                Console.WriteLine("\n1. Login\n2. Register\n3. Exit");
                string choice = Console.ReadLine();
                switch (choice)
                {
                    case "1": await Login.login(); break;
                    case "2":  await Resistor.resistor(); break;
                    case "3": running = false; break;
                }
            }
            else
            {
                Console.WriteLine($"\nWelcome {SessionManager.CurrentEmail}");
                string choice = "";
                if (SessionManager.IsAdmin)
                {
                   choice = await Admin.admin(choice);
                   
                }
                else
                {
                   choice = await Customer.customer(choice);
                }
                if (choice == "6") SessionManager.Logout();
            }
        }
    }
} 


////// Login.cs
using BLL;
using BLL.ServiceINTERFACE;
using DLL.MyDbcontext;
using Shared.DTOs;
using Shared.modal2;
using System;
using System.Collections.Generic;
using System.Text;

namespace UI.Menu
{
    public static class Login
    {
        public static async Task login()
        {
           IAuthService AuthService = new AuthService();
            Console.WriteLine("\n--- Login ---");
            Console.Write("Email: ");
            string email = Console.ReadLine();
            Console.Write("Password: ");
            string password = Console.ReadLine();

            var loginDto = new LoginDTO
            {
                Email = email,
                Password = password
            };

            try
            {
                string msg = await AuthService.Login(loginDto);
                Console.WriteLine(msg);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}

//////REsistor.cs

using BLL;
using BLL.ServiceINTERFACE;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using Utilities;

namespace UI.Menu
{
    public static class Resistor
    {
        public static async Task resistor()
        {
            IAuthService AuthService = new AuthService();
            Console.WriteLine("\n--- Register ---");
            Console.Write("Email: ");
            string email = Console.ReadLine();
            Console.Write("Password: ");
            string password = Console.ReadLine();
            Console.Write("Name: ");
            string name = Console.ReadLine();
            Console.Write("Phone Number (10-digit): ");
            string phone = Console.ReadLine();
            // 1. Create User
            var newResistorDto = new ResistorDTO()
            {
                Email = email,
                Password = password, // SECURITY: Hash password
                IsAdmin = false,   // default False;
                Name = name,
                PhoneNumber = phone
            };
            string msg = await AuthService.Resistor(newResistorDto);
            Console.WriteLine(msg);
            Console.WriteLine("Registration Successful! Please Login.");
        }
    }
}

////////SessionManager
using System;
using System.Collections.Generic;
using System.Text;

namespace Utilities
{
    
    public static class SessionManager
    {
        // Holds the currently logged-in user (UserId)
        public static int? CurrentUserId { get;  set; }
        public static bool IsAdmin { get;  set; }
        public static string CurrentEmail { get;  set; }

        public static void Login(int? userId, string email, bool isAdmin)
        {
            CurrentUserId = userId;
            CurrentEmail = email;
            IsAdmin = isAdmin;
        }

        public static void Logout()
        {
            CurrentUserId = null;
            CurrentEmail = null;
            IsAdmin = false;
        }

        public static bool IsLoggedIn => CurrentUserId.HasValue;
    }

}

// ////////////Auth Service
using BLL.ServiceINTERFACE;
using DLL.MyDbcontext;
using DLL.Repository;
using DLL.RepositoryInterface;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using Utilities;

namespace BLL
{
    public  class AuthService :IAuthService
    {
        IAuthRepo AuthRepo = new AuthRepo();
        public  async Task<string> Resistor(ResistorDTO newUser)
        {
            return await AuthRepo.Resistor(newUser);
        }
        public  async Task<string> Login(LoginDTO newlogin)
        {
            var user = await AuthRepo.Login(newlogin);

            if (user != null && HashUTL.VerifyPassword(newlogin.Password, user.Password))
            {
                Console.WriteLine(user == null ? "User NULL" : "User Found");
                Console.WriteLine(user?.Customer == null ? "Customer NULL" : "Customer Found");
                Console.WriteLine($"userid :{user.Customer?.Id}");
                Console.WriteLine($"username :{user.Customer?.Name}");

                //int? customerId = user.Customer?.Id;
                SessionManager.Login(user.Id, user.Email, user.IsAdmin);
                Console.WriteLine($"Login Successful! Welcome {user.Email}");
            }
            else
            {
                return "Invalid Email or Password.";
            }
            return "Login Success ";
        }
    }
}



// ///////// Auth Repo...
using DLL.MyDbcontext;
using DLL.RepositoryInterface;
using Microsoft.EntityFrameworkCore;
using Shared.DTOs;
using Shared.modal2;
using System;
using System.Threading.Tasks;
using Utilities;

namespace DLL.Repository
{
    public  class AuthRepo :IAuthRepo
    {
        // ---------------- REGISTER ----------------
        public  async Task<string> Resistor(ResistorDTO dto)
        {
            try
            {
                using var db = new MovieBookingContext();
                // 🔍 Check if user already exists (case-insensitive)
                var existingUser = await db.Users
                    .FirstOrDefaultAsync(x => x.Email.ToLower() == dto.Email.ToLower());

                if (existingUser != null)
                    return "User already exists!";

                // 🔐 Create User (with hashed password)
                var user = new User
                {
                    Email = dto.Email,
                    Password = HashUTL.HashPassword(dto.Password),
                    IsAdmin = false // always false from UI
                };

                await db.Users.AddAsync(user);
                await db.SaveChangesAsync(); // to generate UserId

                // 👤 Create Customer ONLY if not admin
                if (!user.IsAdmin)
                {
                    var customer = new Customer
                    {    
                        UserId = user.Id,
                        Name = dto.Name,
                        PhoneNumber = dto.PhoneNumber
                    };

                    await db.Customers.AddAsync(customer);
                    await db.SaveChangesAsync();
                }

                return "Registration Successful!";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }

        // ---------------- LOGIN ----------------
        public  async Task<User> Login(LoginDTO dto)
        {
            using var db = new MovieBookingContext();

            // 🔥 Include Customer (important for non-admin users)
            var user = await db.Users
                .Include(u => u.Customer)
                .FirstOrDefaultAsync(x => x.Email.ToLower() == dto.Email.ToLower());

            return user;
        }
    }
}




// Customer.cs
using BLL;
using BLL.ServiceINTERFACE;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Shared.DTOs;
using Shared.modal2;
using System;
using System.Collections.Generic;
using System.Text;

namespace UI.Menu
{
    public static class Customer
    {
        public static async Task<string> customer(string choice)
        {
            ICustomerService CustomerService = new CustomerService();
            Console.WriteLine("Customer Menu:\n 1. View Movies \n" +
                                              " 2.View Shows (by movie)\n" +
                                              " 3.Book Tickets\n" +
                                              " 4.View My Bookings\n" +
                                              " 5.Cancel Booking\n" +
                                              " 6.Logout \n");
            string optn = Console.ReadLine();
            if (optn == "6")
            {
                choice = "6";
            }
            else if (optn == "1")
            {// View movies
                Console.WriteLine(".....view moview ....\n");
                List<viewMovieDTO> movies = await CustomerService.viewMovies();

                foreach (var movie in movies)
                {
                    Console.WriteLine($"id {movie.Id}"); // Replace with actual DTO property
                    Console.WriteLine($"Title {movie.Title}"); // Replace with actual DTO property
                    Console.WriteLine($"Genre {movie.Genre}"); // Replace with actual DTO property
                    Console.WriteLine($"Duration {movie.Duration}"); // Replace with actual DTO property
                    Console.WriteLine($"IsActive {movie.IsActive}"); // Replace with actual DTO property
                }
            }
            else if (optn == "2")
            {
                //2.View Shows (by movie)
                Console.WriteLine("Enter  the movie ID : ");
                if (int.TryParse(Console.ReadLine(), out var id))
                {
                    List<viewShowDTO> shows = await CustomerService.viewShow(id);
                    foreach (var item in shows)
                    {
                        Console.WriteLine($"ID - {item.Id}|TheaterId- {item.TheaterId} | TheaterName- {item.TheaterName} |TheaterLocation- {item.TheaterLocation} | ShowTime  {item.ShowTime} | TicketPrice - {item.TicketPrice} | AvailableSeats-{item.AvailableSeats}");
                    }
                }
                else
                {
                    Console.WriteLine("Please Enter valid ID ");
                }
            }
            else if (optn == "3")
            {
                //3.Book Tickets
                Console.WriteLine("Enter showId : ");
                if (!int.TryParse(Console.ReadLine(), out int showId))
                {
                    Console.WriteLine("Please enter valid Id ");
                }
                Console.WriteLine("Enter Request Seats by coma seprated like 1,2,3,4  : ");

                string temp = Console.ReadLine();
                string[] requestedSeats = temp.Split(",");

                Console.WriteLine(requestedSeats);
                string bookMsg = await CustomerService.BookTickets(showId, requestedSeats);
                Console.WriteLine(bookMsg);
            }
            else if (optn == "4")
            {
                //4.View My Bookings
                var myBookingsDTO = await CustomerService.GetCustomerBookings();

                if (!myBookingsDTO.Any())
                {
                    Console.WriteLine("NO Booking find");
                }
                else
                {
                    foreach (var booking in myBookingsDTO)
                    {
                        Console.WriteLine($"Booking ID: {booking.Id} | Date: {booking.BookingTime}");
                        Console.WriteLine($"Show: {booking.Show.Movie.Title} | Status: {booking.Status} | Total: ${booking.TotalAmount}");

                        // Join seat numbers into a single string (e.g., "A-10, A-11")
                        var seats = string.Join(", ", booking.BookingDetails.Select(d => d.SeatNumber));
                        Console.WriteLine($"Seats: {seats}");
                        Console.WriteLine("-----------------------------------");
                    }
                }
            }
            else if (optn == "5")
            {
                //5.Cancel Booking
                Console.WriteLine("--- Cancel Booking ---");
                Console.Write("Enter Booking ID to cancel: ");
                if (!int.TryParse(Console.ReadLine(), out int bookingId))
                {
                    Console.WriteLine("Invalid Booking ID format.");
                }
                string cancleMsg = await CustomerService.CancelBooking(bookingId);
                Console.WriteLine(cancleMsg);
            }
            return choice;
        }
    }
}






/////////// EmailSender

using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Utilities
{
    public static class EmailSender
    {
        public static async Task<String> SendOrderConfirmation(string recipientEmail)
        {

            // 1. Setup SMTP Client
            // NOTE: Use your actual SMTP server (e.g., smtp.gmail.com)
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                // For Gmail, 'your-password' should be an "App Password" if 2FA is enabled
                //Credentials = new NetworkCredential("mukulkasana0001@gmail.com", "dskj gztt sptv amlb"),
                Credentials = new NetworkCredential("mukulkasana0001@gmail.com", "mqfb ditz sajh jppl"),
                EnableSsl = true,
            };

            // 2. Construct the Email Body
            string htmlBody = $@"
                <html>
                <body>
                    <h1>Order Confirmation</h1>
                    <p>Thank you for your purchase!</p>
                    <table style='border: 1px solid #ccc; border-collapse: collapse; width: 100%;'>
                        <tr style='background-color: #f2f2f2;'>
                            <th style='padding: 8px; text-align: left;'>Item Name</th>
                            <th style='padding: 8px; text-align: left;'>Quantity</th>
                            <th style='padding: 8px; text-align: left;'>Total Amount</th>
                        </tr>
                        <tr>
                            <td style='padding: 8px; border-bottom: 1px solid #ddd;'>done</td>   
                        </tr>
                    </table>
                    <p>We will notify you when your item ships.</p>
                </body>
                </html>";

            // 3. Create Message
            var mailMessage = new MailMessage
            {
                From = new MailAddress("mukulkasana0001@gmail.com", "Your Store Name"),
                Subject = $"WRITE SUBJECT HERE",
                Body = htmlBody,
                IsBodyHtml = true,
            };

            mailMessage.To.Add(recipientEmail);

            // 4. Send
            try
            {
                smtpClient.Send(mailMessage);
                return "Order confirmation sent successfully!";
            }
            catch (Exception ex)
            {
                return $"Failed to send email: {ex.Message}";
            }
        }

    }
}

////////////////// HashUTL
using System;
using System.Collections.Generic;
using System.Text;

namespace Utilities
{
    public static  class HashUTL
    {
        public static string HashPassword(string password)
        { 
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
        }
        public static  bool VerifyPassword(string password, string hashedPassword)
        {
            
            return BCrypt.Net.BCrypt.EnhancedVerify(password, hashedPassword);
        }
    }
}




///////////////DbContext 


using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Shared.Const;
using Shared.modal2;
using System;
using static Shared.Const.emuns;

namespace DLL.MyDbcontext
{
    public class MovieBookingContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Theater> Theaters { get; set; }
        public DbSet<Show> Shows { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingDetail> BookingDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
             options.UseSqlServer(ConnectionString.getConnectionString);
            //options.UseSqlServer("Data Source=Dell,51434;Initial Catalog=Kuldeep-Singh;User ID=Kuldeep-Singh;Password=Kuldeep-Singh;TrustServerCertificate=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ---------------- USER ----------------
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Email)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(x => x.Password)
                      .IsRequired();

                entity.HasOne(x => x.Customer)
                      .WithOne(c => c.User)
                      .HasForeignKey<Customer>(c => c.UserId);

                // SEED USERS
                entity.HasData(
                    new User { Id = 1, Email = "a@gmail.com", Password = "$2a$13$7vvipQI37KBpNU2mMcAhYe/MYffQ0L1RHMXq.W4Qwlx/m42WIqyM2", IsAdmin = true }
                );
            });

            // ---------------- CUSTOMER ----------------
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Name)
                      .IsRequired();

                entity.Property(x => x.PhoneNumber)
                      .HasMaxLength(10);

                entity.HasMany(x => x.Bookig)
                      .WithOne(b => b.Customer)
                      .HasForeignKey(b => b.CustomerId);

                
            });

            // ---------------- MOVIE ----------------
            modelBuilder.Entity<Movie>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Title)
                      .IsRequired()
                      .HasMaxLength(200);

                entity.Property(x => x.Genre)
                      .IsRequired();

                entity.HasMany(x => x.Show)
                      .WithOne(s => s.Movie)
                      .HasForeignKey(s => s.MovieId);

                // SEED MOVIES
                entity.HasData(
                    new Movie { Id = 1, Title = "Avengers", Genre = "Action", Duration = 180, IsActive = true },
                    new Movie { Id = 2, Title = "Interstellar", Genre = "Sci-Fi", Duration = 169, IsActive = true },
                    new Movie { Id = 3, Title = "Conjuring", Genre = "Horror", Duration = 120, IsActive = false }
                );
            });

            // ---------------- THEATER ----------------
            modelBuilder.Entity<Theater>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Name).IsRequired();
                entity.Property(x => x.Location).IsRequired();

                entity.HasMany(x => x.Show)
                      .WithOne(s => s.Theater)
                      .HasForeignKey(s => s.TheaterId);

                // SEED THEATERS
                entity.HasData(
                    new Theater { Id = 1, Name = "PVR Cinemas", Location = "Delhi" },
                    new Theater { Id = 2, Name = "INOX", Location = "Gurgaon" }
                );
            });

            // ---------------- SHOW ----------------
            modelBuilder.Entity<Show>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.ShowTime)
                      .IsRequired();

                entity.Property(x => x.TicketPrice)
                      .HasColumnType("decimal(10,2)");

                entity.HasMany(x => x.Booking)
                      .WithOne(b => b.Show)
                      .HasForeignKey(b => b.ShowId);

                //// SEED SHOWS (⚠️ FIXED DATE TIME)
                entity.HasData(
                    new Show
                    {
                        Id = 1,
                        MovieId = 1,
                        TheaterId = 1,
                        ShowTime = new DateTime(2026, 4, 25, 18, 0, 0),
                        TotalSeats = 50,
                        AvailableSeats = 50,
                        TicketPrice = 250
                    },
                    new Show
                    {
                        Id = 2,
                        MovieId = 2,
                        TheaterId = 2,
                        ShowTime = new DateTime(2026, 4, 25, 21, 0, 0),
                        TotalSeats = 40,
                        AvailableSeats = 40,
                        TicketPrice = 300
                    }
                );
            });

            // ---------------- BOOKING ----------------
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.TotalAmount)
                      .HasColumnType("decimal(10,2)");

                entity.Property(x => x.Status)
                      .IsRequired();

                entity.HasMany(x => x.BookingDetails)
                      .WithOne(bd => bd.Booking)
                      .HasForeignKey(bd => bd.BookingId);
            });

            // ---------------- BOOKING DETAIL ----------------
            modelBuilder.Entity<BookingDetail>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.SeatNumber)
                      .IsRequired()
                      .HasMaxLength(10);
            });
        }
    }
}




//////////////  MODALS    //// / // /
 
namespace Shared.modal2
{
        public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // Should store Hashed string
        public bool IsAdmin { get; set; } = false;
        public Customer Customer { get; set; }
    }

    public class Customer
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<Booking> Bookig { get; set; }
    }

    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public int Duration { get; set; } // In Minutes
        public bool IsActive { get; set; } = true;
        public ICollection<Show> Show { get; set; }
    }

    public class Theater
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public ICollection<Show> Show { get; set; }
    }

    public class Show
    {

        public int Id { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public int TheaterId { get; set; }
        public Theater Theater { get; set; }
        public DateTime ShowTime { get; set; }
        public int TotalSeats { get; set; }
        public int AvailableSeats { get; set; }
        public decimal TicketPrice { get; set; }
        public ICollection<Booking> Booking { get; set; }
    }

    public class Booking
    {

        public int Id { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int ShowId { get; set; }
        public Show Show { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime BookingTime { get; set; } = DateTime.Now;
        public Status Status  { get; set; }     // Booked, Cancelled
        public ICollection<BookingDetail> BookingDetails { get; set; }
    }

    public class BookingDetail
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public Booking Booking { get; set; }
        public string SeatNumber { get; set; } // Example: 'A-10'
    }

}

// mm