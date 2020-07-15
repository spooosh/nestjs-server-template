const {
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    Column,
} = require('typeorm');

@Entity()
class User {
    @Column({
        readonly: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: true
    })
    full_name: string;

    @Column({
        type: 'varchar',
        length: 18,
        unique: true,
        nullable: true
    })
    phone: string;

    @Column({
        type: 'varchar',
        unique: true,
        readonly: true,
    })
    email: string;

    @Column('varchar')
    hashed_password: string;

    @Column({
        type: 'boolean',
        default: false,
        readonly: true,
    })
    is_admin: boolean;
}

export default User;
