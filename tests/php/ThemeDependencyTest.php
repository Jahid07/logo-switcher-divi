<?php

class ThemeDependencyTest extends WP_UnitTestCase {

	public function test_missing_divi_shows_a_notice_without_a_callback_error() {
		ob_start();
		do_action( 'admin_notices' );
		$notice = ob_get_clean();
		$this->assertStringContainsString( 'Divi logo switcher only works', $notice );
	}
}
