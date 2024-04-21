-- Custom SQL migration file, put you code below! --

CREATE SEQUENCE id_seq
    START WITH 1 
    INCREMENT BY 1 
    MINVALUE 1  
    MAXVALUE 100 
    CYCLE;

ALTER TABLE "applicant" ALTER COLUMN "id" SET DEFAULT nextval('id_seq')