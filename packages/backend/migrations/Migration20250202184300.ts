import { Migration } from '@mikro-orm/migrations';

export class Migration20250202184300 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`book\` (\`id\` int unsigned not null auto_increment primary key, \`title\` varchar(255) not null, \`author\` varchar(255) not null, \`pages\` int not null) default character set utf8mb4 engine = InnoDB;`);
  }

}
