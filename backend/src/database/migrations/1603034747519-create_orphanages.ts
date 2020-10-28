import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1603034747519 implements MigrationInterface {

    //Realiza as alterações - Cria tabela, cria novo campo...
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: 'orphanages',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,   /** não pode ser negativa */
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',                
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,  /** números após a virgula */
                    precision: 2
                },
                {
                    name: 'about',
                    type: 'text'
                },
                {
                    name: 'instructions',
                    type: 'text'
                },
                {
                    name: 'opening_hours',
                    type: 'varchar'
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false,
                }
            ]
        }))
    }

    //Reverte toda criação
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages');
    }

}

// yarn typeorm migration:create -n create_orphanages 

// yarn typeorm migrations:run