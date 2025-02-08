import { Migration } from '@mikro-orm/migrations';

export class Migration20250208153750 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`tour\` (\`id\` varchar(36) not null, \`slug\` varchar(255) not null, \`name\` varchar(255) not null, \`description\` text not null, \`starting_date\` date not null, \`ending_date\` date not null, \`price\` int not null, \`total_seats\` int not null, \`moods_nature\` smallint not null, \`moods_relax\` smallint not null, \`moods_history\` smallint not null, \`moods_culture\` smallint not null, \`moods_party\` smallint not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`
    );
    this.addSql(
      `alter table \`tour\` add unique \`tour_slug_unique\`(\`slug\`);`
    );

    this.addSql(
      `create table \`user\` (\`id\` varchar(36) not null, \`email\` varchar(255) not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`
    );
    this.addSql(
      `alter table \`user\` add unique \`user_email_unique\`(\`email\`);`
    );

    this.addSql(
      `create table \`reservation\` (\`id\` varchar(36) not null, \`tour_id\` varchar(36) not null, \`user_id\` varchar(36) not null, \`seats_reserved\` int not null, \`expires_at\` datetime not null, \`created_at\` datetime not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`
    );
    this.addSql(
      `alter table \`reservation\` add index \`reservation_tour_id_index\`(\`tour_id\`);`
    );
    this.addSql(
      `alter table \`reservation\` add index \`reservation_user_id_index\`(\`user_id\`);`
    );
    this.addSql(
      `alter table \`reservation\` add index \`expire_index\`(\`expires_at\`);`
    );

    this.addSql(
      `create table \`booking\` (\`id\` varchar(36) not null, \`tour_id\` varchar(36) not null, \`user_id\` varchar(36) not null, \`seats_booked\` int not null, \`booking_date\` datetime not null, \`total_price\` numeric(10,2) not null, \`payment_status\` varchar(255) not null default 'pending', primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`
    );
    this.addSql(
      `alter table \`booking\` add index \`booking_tour_id_index\`(\`tour_id\`);`
    );
    this.addSql(
      `alter table \`booking\` add index \`booking_user_id_index\`(\`user_id\`);`
    );
    this.addSql(
      `alter table \`booking\` add index \`payment_status_index\`(\`payment_status\`);`
    );

    this.addSql(
      `alter table \`reservation\` add constraint \`reservation_tour_id_foreign\` foreign key (\`tour_id\`) references \`tour\` (\`id\`) on update cascade;`
    );
    this.addSql(
      `alter table \`reservation\` add constraint \`reservation_user_id_foreign\` foreign key (\`user_id\`) references \`user\` (\`id\`) on update cascade;`
    );

    this.addSql(
      `alter table \`booking\` add constraint \`booking_tour_id_foreign\` foreign key (\`tour_id\`) references \`tour\` (\`id\`) on update cascade;`
    );
    this.addSql(
      `alter table \`booking\` add constraint \`booking_user_id_foreign\` foreign key (\`user_id\`) references \`user\` (\`id\`) on update cascade;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table \`reservation\` drop foreign key \`reservation_tour_id_foreign\`;`
    );

    this.addSql(
      `alter table \`booking\` drop foreign key \`booking_tour_id_foreign\`;`
    );

    this.addSql(
      `alter table \`reservation\` drop foreign key \`reservation_user_id_foreign\`;`
    );

    this.addSql(
      `alter table \`booking\` drop foreign key \`booking_user_id_foreign\`;`
    );

    this.addSql(`drop table if exists \`tour\`;`);

    this.addSql(`drop table if exists \`user\`;`);

    this.addSql(`drop table if exists \`reservation\`;`);

    this.addSql(`drop table if exists \`booking\`;`);
  }
}
