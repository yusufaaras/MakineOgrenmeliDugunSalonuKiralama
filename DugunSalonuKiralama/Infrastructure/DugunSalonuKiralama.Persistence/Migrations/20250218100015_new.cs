using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Weddings_WeddingHalls_WeddingHallId",
                table: "Weddings");

            migrationBuilder.DropTable(
                name: "WeddingDescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Weddings_WeddingHallId",
                table: "Weddings");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Weddings");

            migrationBuilder.DropColumn(
                name: "WeddingHallId",
                table: "Weddings");

            migrationBuilder.AddColumn<string>(
                name: "DetailImageUrl1",
                table: "WeddingHalls",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DetailImageUrl2",
                table: "WeddingHalls",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DetailImageUrl3",
                table: "WeddingHalls",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DetailImageUrl4",
                table: "WeddingHalls",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HomeImageUrl",
                table: "WeddingHalls",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LongDescription",
                table: "WeddingHalls",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShortDescription",
                table: "WeddingHalls",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailImageUrl1",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "DetailImageUrl2",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "DetailImageUrl3",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "DetailImageUrl4",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "HomeImageUrl",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "LongDescription",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "ShortDescription",
                table: "WeddingHalls");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Weddings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "WeddingHallId",
                table: "Weddings",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WeddingDescriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WeddingId = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeddingDescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeddingDescriptions_Weddings_WeddingId",
                        column: x => x.WeddingId,
                        principalTable: "Weddings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Weddings_WeddingHallId",
                table: "Weddings",
                column: "WeddingHallId");

            migrationBuilder.CreateIndex(
                name: "IX_WeddingDescriptions_WeddingId",
                table: "WeddingDescriptions",
                column: "WeddingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Weddings_WeddingHalls_WeddingHallId",
                table: "Weddings",
                column: "WeddingHallId",
                principalTable: "WeddingHalls",
                principalColumn: "Id");
        }
    }
}
