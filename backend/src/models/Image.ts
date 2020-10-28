import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Orphanage from './Orphanage';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;
    
    @ManyToOne(() => Orphanage, orphanage => orphanage.images)             /** Recebe a entidade e a partir dela, qual o campo que se relaciona */
    @JoinColumn({name: 'orphanage_id'})
    orphanage: Orphanage;
}