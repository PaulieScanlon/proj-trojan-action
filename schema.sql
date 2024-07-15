CREATE TABLE test_table (
    id SERIAL PRIMARY KEY,
    some_data TEXT
);

INSERT INTO test_table (some_data)
SELECT 'Some data ' || generate_series
FROM generate_series(1, 100000000);


-- In MB
SELECT pg_size_pretty(pg_database_size('neondb'));

-- In GiB
SELECT pg_size_pretty(pg_database_size('neondb') / (1024 * 1024 * 1024)) AS size_in_gib;


SELECT pg_size_pretty(pg_total_relation_size('test_table')) AS table_size;