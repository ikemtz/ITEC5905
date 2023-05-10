﻿// <auto-generated />
using System;
using ITEC5905.Artists.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ITEC5905.Artists.Migrations.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ITEC5905.Artists.Models.V1.Artist", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("CreatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<int?>("UpdateCount")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset?>("UpdatedOnUtc")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Artists");
                });
#pragma warning restore 612, 618
        }
    }
}
