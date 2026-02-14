-- CreateEnum
CREATE TYPE "enum_ErrorLogs_severity" AS ENUM ('low', 'medium', 'high', 'critical');

-- CreateEnum
CREATE TYPE "enum_HttpLogs_type" AS ENUM ('request', 'response');

-- CreateEnum
CREATE TYPE "enum_Suppliers_taxRegime" AS ENUM ('Simples Nacional', 'Lucro Presumido', 'Lucro Real', 'MEI');

-- CreateEnum
CREATE TYPE "enum_Users_role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "ErrorLogs" (
    "id" UUID NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "errorStack" TEXT,
    "errorCode" VARCHAR(255),
    "url" TEXT NOT NULL,
    "method" VARCHAR(255) NOT NULL,
    "requestBody" JSONB,
    "queryParams" JSONB,
    "userId" UUID,
    "userEmail" VARCHAR(255),
    "ipAddress" VARCHAR(255),
    "userAgent" VARCHAR(255),
    "severity" "enum_ErrorLogs_severity" DEFAULT 'medium',
    "resolved" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ErrorLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HttpLogs" (
    "id" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "type" "enum_HttpLogs_type" NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "method" VARCHAR(255) NOT NULL,
    "url" TEXT NOT NULL,
    "headers" JSONB,
    "body" JSONB,
    "queryParams" JSONB,
    "statusCode" INTEGER,
    "responseTime" INTEGER,
    "userId" UUID,
    "userEmail" VARCHAR(255),
    "ipAddress" VARCHAR(255),
    "userAgent" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "HttpLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" UUID NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "tradingName" VARCHAR(255),
    "cnpj" VARCHAR(18) NOT NULL,
    "stateRegistration" VARCHAR(255),
    "municipalRegistration" VARCHAR(255),
    "address" VARCHAR(255) NOT NULL,
    "addressNumber" VARCHAR(255) NOT NULL,
    "addressComplement" VARCHAR(255),
    "neighborhood" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "zipCode" VARCHAR(9) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "contactName" VARCHAR(255) NOT NULL,
    "website" VARCHAR(255),
    "businessActivity" VARCHAR(255) NOT NULL,
    "taxRegime" "enum_Suppliers_taxRegime",
    "bankName" VARCHAR(255),
    "bankBranch" VARCHAR(255),
    "bankAccount" VARCHAR(255),
    "bankPixKey" VARCHAR(255),
    "notes" TEXT,
    "active" BOOLEAN DEFAULT true,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testes" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Testes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "enum_Users_role" DEFAULT 'user',
    "active" BOOLEAN DEFAULT true,
    "passwordChangedAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_cnpj_key" ON "Suppliers"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Testes_telefone_key" ON "Testes"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
