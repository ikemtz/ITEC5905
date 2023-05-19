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
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

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
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE TABLE `Pictures` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `Blob` longblob NOT NULL,
        `Type` varchar(5) CHARACTER SET utf8mb4 NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_Pictures` PRIMARY KEY (`Id`)
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
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE TABLE `Artists` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `StageName` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `AlbumCount` int NOT NULL,
        `SongCount` int NOT NULL,
        `PictureId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_Artists` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_Artists_Pictures_PictureId` FOREIGN KEY (`PictureId`) REFERENCES `Pictures` (`Id`) ON DELETE CASCADE
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
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE TABLE `Albums` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ArtistId` char(36) COLLATE ascii_general_ci NOT NULL,
        `SongCount` int NOT NULL,
        `PictureId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_Albums` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_Albums_Artists_ArtistId` FOREIGN KEY (`ArtistId`) REFERENCES `Artists` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_Albums_Pictures_PictureId` FOREIGN KEY (`PictureId`) REFERENCES `Pictures` (`Id`) ON DELETE CASCADE
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
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE TABLE `ArtistGenres` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ArtistId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_ArtistGenres` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_ArtistGenres_Artists_ArtistId` FOREIGN KEY (`ArtistId`) REFERENCES `Artists` (`Id`) ON DELETE CASCADE
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
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE TABLE `AlbumSongs` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `AlbumId` char(36) COLLATE ascii_general_ci NOT NULL,
        `SongId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_AlbumSongs` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_AlbumSongs_Albums_AlbumId` FOREIGN KEY (`AlbumId`) REFERENCES `Albums` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_AlbumSongs_Artists_SongId` FOREIGN KEY (`SongId`) REFERENCES `Artists` (`Id`) ON DELETE CASCADE
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
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE TABLE `Songs` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `AlbumId` char(36) COLLATE ascii_general_ci NOT NULL,
        `PictureId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_Songs` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_Songs_Albums_AlbumId` FOREIGN KEY (`AlbumId`) REFERENCES `Albums` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_Songs_Pictures_PictureId` FOREIGN KEY (`PictureId`) REFERENCES `Pictures` (`Id`) ON DELETE CASCADE
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
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE TABLE `ArtistSongs` (
        `Id` char(36) COLLATE ascii_general_ci NOT NULL,
        `ArtistId` char(36) COLLATE ascii_general_ci NOT NULL,
        `SongId` char(36) COLLATE ascii_general_ci NOT NULL,
        `CreatedBy` longtext CHARACTER SET utf8mb4 NOT NULL,
        `UpdatedBy` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedOnUtc` datetime(6) NOT NULL,
        `UpdatedOnUtc` datetime(6) NULL,
        `UpdateCount` int NULL,
        CONSTRAINT `PK_ArtistSongs` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_ArtistSongs_Artists_ArtistId` FOREIGN KEY (`ArtistId`) REFERENCES `Artists` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_ArtistSongs_Songs_SongId` FOREIGN KEY (`SongId`) REFERENCES `Songs` (`Id`) ON DELETE CASCADE
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
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_Albums_ArtistId` ON `Albums` (`ArtistId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_Albums_PictureId` ON `Albums` (`PictureId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_AlbumSongs_AlbumId` ON `AlbumSongs` (`AlbumId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_AlbumSongs_SongId` ON `AlbumSongs` (`SongId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_ArtistGenres_ArtistId` ON `ArtistGenres` (`ArtistId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_Artists_PictureId` ON `Artists` (`PictureId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_ArtistSongs_ArtistId` ON `ArtistSongs` (`ArtistId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_ArtistSongs_SongId` ON `ArtistSongs` (`SongId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_Songs_AlbumId` ON `Songs` (`AlbumId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    CREATE INDEX `IX_Songs_PictureId` ON `Songs` (`PictureId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20230519074436_Initial') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20230519074436_Initial', '6.0.16');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

