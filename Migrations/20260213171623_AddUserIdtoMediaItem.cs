using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MediaApp.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdtoMediaItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isCompleted",
                table: "MediaItems",
                newName: "IsCompleted");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "MediaItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MediaItems");

            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "MediaItems",
                newName: "isCompleted");
        }
    }
}
