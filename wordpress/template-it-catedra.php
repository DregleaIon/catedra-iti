<?php
/*
Template Name: Catedra IT (React)
*/

$allowed_views = array('home', 'despre', 'profesori', 'profesor', 'studenti', 'media', 'noutati', 'contact');
$raw_view = isset($_GET['view']) ? sanitize_key(wp_unslash($_GET['view'])) : 'home';
$view = in_array($raw_view, $allowed_views, true) ? $raw_view : 'home';

$base_url = get_permalink();

$nav_links = array(
  array('key' => 'home', 'href' => add_query_arg('view', 'home', $base_url), 'label' => 'Acasă'),
  array('key' => 'despre', 'href' => add_query_arg('view', 'despre', $base_url), 'label' => 'Despre'),
  array('key' => 'profesori', 'href' => add_query_arg('view', 'profesori', $base_url), 'label' => 'Profesori'),
  array('key' => 'studenti', 'href' => add_query_arg('view', 'studenti', $base_url), 'label' => 'Studenți'),
  array('key' => 'media', 'href' => add_query_arg('view', 'media', $base_url), 'label' => 'Media'),
  array('key' => 'noutati', 'href' => add_query_arg('view', 'noutati', $base_url), 'label' => 'Noutăți'),
  array('key' => 'contact', 'href' => add_query_arg('view', 'contact', $base_url), 'label' => 'Contact'),
);

$seo_map = array(
  'home' => array(
    'title' => 'Catedra IT - Acasă',
    'description' => 'Pagina principală a site-ului catedrei Informatica și Tehnologii Informaționale',
  ),
  'despre' => array(
    'title' => 'Catedra IT - Despre',
    'description' => 'Despre catedra Informatica și Tehnologii Informaționale',
  ),
  'profesori' => array(
    'title' => 'Catedra IT - Profesori',
    'description' => 'Cadre didactice ale catedrei Informatica și Tehnologii Informaționale',
  ),
  'profesor' => array(
    'title' => 'Catedra IT - Profil Profesor',
    'description' => 'Profil individual al cadrelor didactice din catedra Informatica și Tehnologii Informaționale',
  ),
  'studenti' => array(
    'title' => 'Catedra IT - Studenți',
    'description' => 'Informații pentru studenții catedrei Informatica și Tehnologii Informaționale',
  ),
  'media' => array(
    'title' => 'Catedra IT - Media',
    'description' => 'Galerie video și foto pentru catedra Informatica și Tehnologii Informaționale',
  ),
  'noutati' => array(
    'title' => 'Catedra IT - Noutăți',
    'description' => 'Noutăți și anunțuri oficiale ale catedrei Informatica și Tehnologii Informaționale',
  ),
  'contact' => array(
    'title' => 'Catedra IT - Contact',
    'description' => 'Date de contact pentru catedra Informatica și Tehnologii Informaționale',
  ),
);

$seo_current = isset($seo_map[$view]) ? $seo_map[$view] : $seo_map['home'];
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php wp_title('|', true, 'right'); ?></title>
  <meta name="description" content="<?php echo esc_attr($seo_current['description']); ?>">
  <meta name="robots" content="index,follow">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ro_RO">
  <meta property="og:title" content="<?php echo esc_attr($seo_current['title']); ?>">
  <meta property="og:description" content="<?php echo esc_attr($seo_current['description']); ?>">
  <meta name="twitter:card" content="summary_large_image">
  <?php wp_head(); ?>
  <link rel="preconnect" href="https://unpkg.com" crossorigin>
  <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/it-catedra/styles.css">
</head>
<body <?php body_class(); ?> data-page="<?php echo esc_attr($view); ?>">
  <?php wp_body_open(); ?>

  <div id="root"></div>

  <script>
    window.IT_SITE_CONFIG = {
      defaultPage: <?php echo wp_json_encode($view); ?>,
      navLinks: <?php echo wp_json_encode($nav_links); ?>,
      enableServiceWorker: false
    };
  </script>

  <script defer src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin="anonymous"></script>
  <script defer src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin="anonymous"></script>
  <script defer src="https://unpkg.com/htm@3.1.1/dist/htm.umd.js" crossorigin="anonymous"></script>
  <script defer src="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/it-catedra/app.js"></script>

  <?php wp_footer(); ?>
</body>
</html>
