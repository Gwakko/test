<?php

namespace App\Exceptions\Services;

use Exception;

class ValidationRuleNotFoundException extends Exception
{
    protected $message = 'Validation Rule Not Found';
}
