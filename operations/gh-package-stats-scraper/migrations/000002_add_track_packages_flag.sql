-- ============================================================================
-- Migration 000002: Add the track_packages opt-in flag
-- ============================================================================
-- Package scraping (gh-package-stats-scraper) is OPT-IN per repository: most
-- tracked repos publish no GitHub packages (or publish elsewhere, e.g.
-- DockerHub), so the scraper only covers repos where track_packages = 1 —
-- mirroring how is_active gates the main sync.
--
-- NOTE: MySQL 8 has no "ADD COLUMN IF NOT EXISTS" — run this migration once.
-- The UPDATE seeds the flag for the three repos currently known to publish
-- GitHub container packages; flip it later with a plain UPDATE as repos start
-- or stop publishing packages.
-- ============================================================================

USE `github_statistics`;

ALTER TABLE `tracked_repositories`
    ADD COLUMN `track_packages` TINYINT(1) NOT NULL DEFAULT 0 AFTER `is_active`;

UPDATE `tracked_repositories` SET `track_packages` = 1
WHERE (`org_name`, `repo_name`) IN (
    ('wso2', 'agent-manager')
);
