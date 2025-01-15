/*
  Warnings:

  - You are about to alter the column `jumlah` on the `kebutuhans` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.

*/
-- AlterTable
ALTER TABLE `kebutuhans` MODIFY `jumlah` INTEGER NOT NULL;
