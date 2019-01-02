-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2019 at 05:22 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fullstack`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(12) NOT NULL,
  `student_name` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_name`, `phone`, `email`, `avatar`) VALUES
(1, 'דן מנור', '052-7763456', 'danm@gmail.com', '1537824373.jpg'),
(2, 'רועי בר', '050-8841236', 'roeeb@hotmail.com', '1537052945.jpg'),
(4, 'חנה סנש', '052-6147894', 'hanas@gmail.com', 'wonderWoman.jpg'),
(6, 'צופית גפן', '053-2149898', 'tzofit@mail.com', '1537457776.gif'),
(7, 'אלישי נווה', '077-7812354', 'elishayn@hotmail.com', '1537619561.jpg'),
(8, 'אהוד אבוטבול', '054-3216547', 'ehuda@walla.co.il', '1537620041.'),
(9, 'שירן מלמד', '053-8874561', 'shiranm@gmail.com', '1537620309.gif'),
(10, 'יעל מנסור', '055-8745654', 'yaelm@amdocs.com', '1538933951.jpg'),
(11, 'מירב שילה', '055-8887777', 'meiravs@amdocs.com', '1538933999.png'),
(12, 'שמעון בוסקילה', '053-4567988', 'shimonb@walla.co.il', '1537626379.gif'),
(13, 'מריאנה אר', '052-8874521', 'marianae@hotmail.com', '1537626423.jpg'),
(14, 'ארז צור', '053-5547896', 'erez.zur@gmail.com', '1537626264.jpg'),
(15, 'תמר מרון', '052-78896541', 'tamarm@exodus.com', '1537626188.jpg'),
(16, 'משה יורם', '054-8887777', 'moshey@exodus.com', '1537626171.jpg'),
(17, 'קסנדרה בבלו', '050-8475555', 'casandrab11@gmail.com', '1537625917.jpg'),
(25, 'יהונתן דוד', '077-7808024', 'baba@coma', 'blank_image.png'),
(27, 'יוחנן פאולו', '050-6668874', 'yossiev@gmail.com', 'blank_image.png'),
(28, 'TEsting test', '068-9987412', 'test@gmail.com', 'something.jpg'),
(29, 'Yossi Even', '050-6887144', 'yossi.even@gmail.com', 'avatar.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
