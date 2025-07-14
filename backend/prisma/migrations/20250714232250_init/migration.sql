-- CreateTable
CREATE TABLE "Linha" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "soma" DOUBLE PRECISION NOT NULL,
    "criado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario" TEXT NOT NULL,

    CONSTRAINT "Linha_pkey" PRIMARY KEY ("id")
);
