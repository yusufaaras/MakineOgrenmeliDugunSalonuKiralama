using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class migUserAndWedding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "WeddingHalls",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WeddingHalls_UserId",
                table: "WeddingHalls",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeddingHalls_AppUsers_UserId",
                table: "WeddingHalls",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "AppUserID",
                onDelete: ReferentialAction.NoAction); // CASCADE yerine NO ACTION kullanıldı
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeddingHalls_AppUsers_UserId",
                table: "WeddingHalls");

            migrationBuilder.DropIndex(
                name: "IX_WeddingHalls_UserId",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "WeddingHalls");
        }
    }
}
