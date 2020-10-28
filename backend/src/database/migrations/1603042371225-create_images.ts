import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1603042371225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: 'images',
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
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',
                }
            ],
            foreignKeys:[
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'orphanages',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}

// yarn typeorm migration:create -n create_images                /** cria a tabela */

// yarn typeorm migrations:run