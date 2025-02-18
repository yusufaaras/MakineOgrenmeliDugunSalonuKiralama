using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class wedding_update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "WeddingHalls",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WeddingHalls_CategoryId",
                table: "WeddingHalls",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeddingHalls_Categories_CategoryId",
                table: "WeddingHalls",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeddingHalls_Categories_CategoryId",
                table: "WeddingHalls");

            migrationBuilder.DropIndex(
                name: "IX_WeddingHalls_CategoryId",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "WeddingHalls");
        }
    }
}
