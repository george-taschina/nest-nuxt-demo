import { Migration } from '@mikro-orm/migrations';

export class Migration20250206195131 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`tour\` (\`id\` varchar(36) not null, \`slug\` varchar(255) not null, \`name\` varchar(255) not null, \`description\` text not null, \`starting_date\` date not null, \`ending_date\` date not null, \`price\` int not null, \`moods_nature\` smallint not null, \`moods_relax\` smallint not null, \`moods_history\` smallint not null, \`moods_culture\` smallint not null, \`moods_party\` smallint not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`tour\` add unique \`tour_slug_unique\`(\`slug\`);`);
  }

}
