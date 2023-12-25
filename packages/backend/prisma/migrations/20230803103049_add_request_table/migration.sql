-- CreateTable
CREATE TABLE "Request" (
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("senderId","receiverId")
);
