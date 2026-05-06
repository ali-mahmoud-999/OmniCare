-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "primaryPhone" TEXT NOT NULL,
    "whatsappLink" TEXT NOT NULL,
    "supportEmail" TEXT NOT NULL,
    "officeAddressEn" TEXT NOT NULL,
    "officeAddressAr" TEXT NOT NULL DEFAULT '',
    "promoBannerTextEn" TEXT,
    "promoBannerTextAr" TEXT,
    "promoBannerActive" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "selectedService" TEXT NOT NULL,
    "targetDistrict" TEXT NOT NULL,
    "specialRequests" TEXT,
    "status" TEXT NOT NULL DEFAULT 'New',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL DEFAULT '',
    "iconLink" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL,
    "feedbackEn" TEXT NOT NULL,
    "feedbackAr" TEXT NOT NULL DEFAULT '',
    "areaEn" TEXT NOT NULL,
    "areaAr" TEXT NOT NULL DEFAULT '',
    "rating" INTEGER NOT NULL DEFAULT 5
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionEn" TEXT NOT NULL,
    "questionAr" TEXT NOT NULL DEFAULT '',
    "answerEn" TEXT NOT NULL,
    "answerAr" TEXT NOT NULL DEFAULT ''
);
