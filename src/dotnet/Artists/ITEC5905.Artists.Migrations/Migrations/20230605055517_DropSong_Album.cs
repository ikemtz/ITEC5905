using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ITEC5905.Artists.Migrations.Migrations
{
    /// <inheritdoc />
    public partial class DropSong_Album : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Albums_AlbumId",
                table: "AlbumSongs");

            migrationBuilder.DropIndex(
                name: "IX_Songs_AlbumId",
                table: "AlbumSongs");

            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "AlbumSongs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AlbumId",
                table: "AlbumSongs",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Songs_AlbumId",
                table: "AlbumSongs",
                column: "AlbumId");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Albums_AlbumId",
                table: "AlbumSongs",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "Id");
        }
    }
}
