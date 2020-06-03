using System;
using System.Linq;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DerogationSystemWeb
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }

        public Startup()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("config.json");
            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = $"Server={Configuration["Databases:MainDb:ServerAddress"]}\\{Configuration["Databases:MainDb:ServerName"]};" +
                                   $"Database={Configuration["Databases:MainDb:DatabaseName"]};" +
                                   $"User ID={Configuration["Databases:MainDb:UserId"]};" +
                                   $"Password={Configuration["Databases:MainDb:Password"]}";
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));

            var secondConnectionString = $"Server={Configuration["Databases:SecondDb:ServerAddress"]}\\{Configuration["Databases:SecondDb:ServerName"]};" +
                                         $"Database={Configuration["Databases:SecondDb:DatabaseName"]};" +
                                         $"User ID={Configuration["Databases:SecondDb:UserId"]};" +
                                         $"Password={Configuration["Databases:SecondDb:Password"]}";
            services.AddDbContext<SecondAppContext>(options => options.UseSqlServer(secondConnectionString));

            services.AddTransient<UserService>();
            services.AddTransient<DerogationService>();
            services.AddTransient<NotificationSenderService>();

            services.AddHttpsRedirection(options => options.HttpsPort = 8443);

            services.AddAuthentication("Cookie").AddCookie("Cookie");
            services.AddAuthorization();

            services.AddSignalR();
            services.AddControllers();

            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<HubService>("/interactive");
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}