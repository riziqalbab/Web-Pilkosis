-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2024 at 05:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `chat_id` varchar(20) DEFAULT NULL,
  `report_text` text DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `class` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `chat_id`, `report_text`, `name`, `class`, `created_at`) VALUES
(1, '628895869590@c.us', '', 'tegar', 'xi pplg 1', '2024-07-10 08:03:48'),
(2, '628895869590@c.us', 'saya gak dapat password', 'tegar', 'xi pplg', '2024-07-10 08:16:33'),
(3, '6285182649387@c.us', 'nggo nulis sesuatu nggo sing gawe', 'Terima kasih telah melaporkan kesalahan. Mohon berikan nama Anda:', 'Terima kasih. Mohon berikan kelas Anda:', '2024-07-11 13:13:03'),
(4, '6285182649387@c.us', '(pesane apa nggo sing gawe)', 'Terima kasih telah melaporkan kesalahan. Mohon berikan nama Anda:', 'Terima kasih. Mohon berikan kelas Anda:', '2024-07-11 13:13:30'),
(5, '628895869590@c.us', 'ea', 'tegar', 'xi pplg 1', '2024-07-11 13:15:50'),
(6, '6285182649387@c.us', 'nek ana kendala nang chatbot atau pilkosis', 'Terima kasih telah melaporkan kesalahan. Mohon berikan nama Anda:', 'Terima kasih. Mohon berikan kelas Anda:', '2024-07-11 13:18:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
