﻿// <auto-generated />
using System;
using ITEC5905.Artists.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ITEC5905.Artists.Migrations.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20230605055517_DropSong_Album")]
    partial class DropSong_Album
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Album", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("ArtistId")
                        .HasColumnType("char(36)");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset>("CreatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PictureIpfsHash")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PictureType")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("SongCount")
                        .HasColumnType("int");

                    b.Property<int?>("UpdateCount")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset?>("UpdatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ArtistId");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.AlbumSong", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("AlbumId")
                        .HasColumnType("char(36)");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset>("CreatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("SongId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("UpdateCount")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset?>("UpdatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.HasIndex("SongId");

                    b.ToTable("AlbumSongs");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Artist", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<int>("AlbumCount")
                        .HasColumnType("int");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset>("CreatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PictureIpfsHash")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PictureType")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("SongCount")
                        .HasColumnType("int");

                    b.Property<string>("StageName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<int?>("UpdateCount")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset?>("UpdatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Artists");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.ArtistGenre", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("ArtistId")
                        .HasColumnType("char(36)");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset>("CreatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("GenreId")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<int?>("UpdateCount")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset?>("UpdatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ArtistId");

                    b.HasIndex("GenreId");

                    b.ToTable("ArtistGenres");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.ArtistSong", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("ArtistId")
                        .HasColumnType("char(36)");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset>("CreatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Index")
                        .HasColumnType("int");

                    b.Property<Guid>("SongId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("UpdateCount")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset?>("UpdatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("ArtistId");

                    b.HasIndex("SongId");

                    b.ToTable("ArtistSongs");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Genre", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset>("CreatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("UpdateCount")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset?>("UpdatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Genres");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Song", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset>("CreatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("GenreId")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("IpfsHash")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PictureIpfsHash")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PictureType")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("UpdateCount")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTimeOffset?>("UpdatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("GenreId");

                    b.ToTable("AlbumSongs");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Album", b =>
                {
                    b.HasOne("ITEC5905.Artists.Models.V1.Artist", "Artist")
                        .WithMany("Albums")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artist");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.AlbumSong", b =>
                {
                    b.HasOne("ITEC5905.Artists.Models.V1.Album", "Album")
                        .WithMany("AlbumSongs")
                        .HasForeignKey("AlbumId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ITEC5905.Artists.Models.V1.Song", "Song")
                        .WithMany("AlbumSongs")
                        .HasForeignKey("SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Album");

                    b.Navigation("Song");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.ArtistGenre", b =>
                {
                    b.HasOne("ITEC5905.Artists.Models.V1.Artist", "Artist")
                        .WithMany("Genres")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ITEC5905.Artists.Models.V1.Genre", "Genre")
                        .WithMany()
                        .HasForeignKey("GenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artist");

                    b.Navigation("Genre");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.ArtistSong", b =>
                {
                    b.HasOne("ITEC5905.Artists.Models.V1.Artist", "Artist")
                        .WithMany("ArtistSongs")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ITEC5905.Artists.Models.V1.Song", "Song")
                        .WithMany("ArtistSongs")
                        .HasForeignKey("SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artist");

                    b.Navigation("Song");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Song", b =>
                {
                    b.HasOne("ITEC5905.Artists.Models.V1.Genre", "Genre")
                        .WithMany()
                        .HasForeignKey("GenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Genre");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Album", b =>
                {
                    b.Navigation("AlbumSongs");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Artist", b =>
                {
                    b.Navigation("Albums");

                    b.Navigation("ArtistSongs");

                    b.Navigation("Genres");
                });

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Song", b =>
                {
                    b.Navigation("AlbumSongs");

                    b.Navigation("ArtistSongs");
                });
#pragma warning restore 612, 618
        }
    }
}