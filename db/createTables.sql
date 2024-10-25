-- 1. Таблица пользователей (users)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Таблица игровых сессий (sessions)
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_end TIMESTAMP,
    is_win BOOLEAN
);

-- 3. Таблица типов достижений (achievement_types)
CREATE TABLE IF NOT EXISTS achievement_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Таблица достижений пользователя (achievements)
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    achievement_type_id INTEGER REFERENCES achievement_types(id) ON DELETE CASCADE,
    achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Таблица настроек пользователя (user_settings)
CREATE TABLE IF NOT EXISTS user_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    theme_id INTEGER REFERENCES themes(id) DEFAULT 1,
    difficulty_level_id INTEGER REFERENCES difficulty_levels(id) DEFAULT 1,
    sound_enabled BOOLEAN DEFAULT TRUE,
    notifications_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Таблица друзей пользователя (user_friends)
CREATE TABLE IF NOT EXISTS user_friends (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    friend_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Таблица тем оформления (themes)
CREATE TABLE IF NOT EXISTS themes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавление стандартных тем в таблицу themes
INSERT INTO themes (name, description) VALUES
('default', 'Стандартная тема игры'),
('dark', 'Тёмная тема с контрастными элементами'),
('light', 'Светлая тема с мягкими цветами');

-- 8. Таблица уровней сложности (difficulty_levels)
CREATE TABLE IF NOT EXISTS difficulty_levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    enemy_count INTEGER DEFAULT 10,
    enemy_speed FLOAT DEFAULT 1.0,
    bonus_frequency FLOAT DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавление стандартных уровней сложности в таблицу difficulty_levels
INSERT INTO difficulty_levels (name, description, enemy_count, enemy_speed, bonus_frequency) VALUES
('easy', 'Лёгкий уровень с меньшим количеством врагов и низкой скоростью.', 5, 0.5, 1.5),
('normal', 'Средний уровень сложности с оптимальным количеством врагов.', 10, 1.0, 1.0),
('hard', 'Сложный уровень с увеличенным количеством врагов и высокой скоростью.', 15, 1.5, 0.5);
