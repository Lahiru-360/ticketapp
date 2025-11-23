-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `assignedToUserId` INTEGER NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `username` TEXT NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `role` ENUM('ADMIN', 'TECH', 'USER') NOT NULL DEFAULT 'USER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
