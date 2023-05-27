CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074036_Initial') THEN

    ALTER DATABASE CHARACTER SET utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074036_Initial') THEN

    CREATE TABLE `Customers` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_Customers` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074036_Initial') THEN

    CREATE TABLE `CustomerFavoriteArtists` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `ArtistsName` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ArtistId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CustomerId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_CustomerFavoriteArtists` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_CustomerFavoriteArtists_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `Customers` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074036_Initial') THEN

    CREATE TABLE `CustomerFavoriteGenres` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `CustomerId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_CustomerFavoriteGenres` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_CustomerFavoriteGenres_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `Customers` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074036_Initial') THEN

    CREATE TABLE `CustomerPurchases` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `ArtistsName` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ArtistId` char(36) COLLATE ascii_general_ci NOT NULL,
        `SongName` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `TransactionNum` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Rating` tinyint unsigned NULL,
        `SongId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CustomerId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_CustomerPurchases` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_CustomerPurchases_Customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `Customers` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074036_Initial') THEN

    CREATE INDEX `IX_CustomerFavoriteArtists_CustomerId` ON `CustomerFavoriteArtists` (`CustomerId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074036_Initial') THEN

    CREATE INDEX `IX_CustomerFavoriteGenres_CustomerId` ON `CustomerFavoriteGenres` (`CustomerId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074036_Initial') THEN

    CREATE INDEX `IX_CustomerPurchases_CustomerId` ON `CustomerPurchases` (`CustomerId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074036_Initial') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20230519074036_Initial', '7.0.5');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

