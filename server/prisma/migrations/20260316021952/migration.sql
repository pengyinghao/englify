-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('NOT_PAY', 'WAIT_BUYER_PAY', 'TRADE_CLOSED', 'TRADE_SUCCESS', 'TRADE_FINISHED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "wordNumber" INTEGER NOT NULL DEFAULT 0,
    "dayNumber" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "word_book_record" (
    "id" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "isMaster" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "word_book_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "word_book" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "phonetic" TEXT,
    "definition" TEXT,
    "translation" TEXT,
    "pos" TEXT,
    "collins" TEXT,
    "oxford" TEXT,
    "tag" TEXT,
    "bnc" TEXT,
    "frq" TEXT,
    "exchange" TEXT,
    "gk" BOOLEAN,
    "zk" BOOLEAN,
    "gre" BOOLEAN,
    "toefl" BOOLEAN,
    "ielts" BOOLEAN,
    "cet6" BOOLEAN,
    "cet4" BOOLEAN,
    "ky" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "word_book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_record" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tradeNo" TEXT,
    "outTradeNo" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "tradeStatus" "TradeStatus" NOT NULL DEFAULT 'NOT_PAY',
    "sendPayTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_record" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "isPurchased" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentRecordId" TEXT,

    CONSTRAINT "course_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "teacher" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "word_book_record_userId_wordId_key" ON "word_book_record"("userId", "wordId");

-- CreateIndex
CREATE INDEX "word_book_word_idx" ON "word_book"("word");

-- CreateIndex
CREATE INDEX "word_book_tag_idx" ON "word_book"("tag");

-- CreateIndex
CREATE INDEX "word_book_word_tag_idx" ON "word_book"("word", "tag");

-- CreateIndex
CREATE UNIQUE INDEX "payment_record_outTradeNo_key" ON "payment_record"("outTradeNo");

-- CreateIndex
CREATE INDEX "payment_record_tradeNo_idx" ON "payment_record"("tradeNo");

-- CreateIndex
CREATE UNIQUE INDEX "course_record_userId_courseId_key" ON "course_record"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "word_book_record" ADD CONSTRAINT "word_book_record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_book_record" ADD CONSTRAINT "word_book_record_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "word_book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_record" ADD CONSTRAINT "payment_record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_record" ADD CONSTRAINT "course_record_paymentRecordId_fkey" FOREIGN KEY ("paymentRecordId") REFERENCES "payment_record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_record" ADD CONSTRAINT "course_record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_record" ADD CONSTRAINT "course_record_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
