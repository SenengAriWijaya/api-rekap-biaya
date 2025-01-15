/*
  Warnings:

  - Added the required column `repeatPassword` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `repeatPassword` VARCHAR(150) NOT NULL;
