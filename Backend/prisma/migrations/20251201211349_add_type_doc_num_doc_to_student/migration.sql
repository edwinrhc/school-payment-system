/*
  Warnings:

  - Added the required column `numDoc` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeDoc` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Student`
  ADD COLUMN `typeDoc` VARCHAR(191) NOT NULL DEFAULT 'DNI',
  ADD COLUMN `numDoc` VARCHAR(191) NOT NULL DEFAULT '00000000';
