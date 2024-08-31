import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { CONNECTION_POOL } from './database.module-definition';
import { catchError, from } from 'rxjs';
import { createTableQuery } from 'src/app/asset/sql/create-table';

@Injectable()
class DatabaseService implements OnModuleInit {
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}

  onModuleInit() {
    return this.runQuery(createTableQuery)
      .pipe(
        catchError((err) => {
          return err;
        }),
      )
      .subscribe();
  }

  runQuery(query: string, params?: unknown[]) {
    return from(this.pool.query(query, params));
  }
}

export default DatabaseService;
