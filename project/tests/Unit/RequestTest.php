<?php

namespace Tests\Unit;

use App\Http\Requests\MessageRequest;
use Illuminate\Validation\Validator;
use Illuminate\Support\Str;
use Tests\TestCase;

class RequestTest extends TestCase
{
    /**
     * @var array|\string[][]
     */
    private $rules;

    /**
     * @var Validator
     */
    private $validator;

    protected function setUp(): void
    {
        parent::setUp();

        $this->validator = app()->get('validator');
        $this->rules = (new MessageRequest())->rules();
    }

    /**
     * A basic unit test example.
     *
     * @return array
     */
    public function validationProvider()
    {
        return [
            'request_should_fail_when_no_message_is_provided' => [
                'passed' => false,
                'data' => [
                    'user_id' => time()
                ],
            ],
            'request_should_fail_when_message_is_empty' => [
                'passed' => false,
                'data' => [
                    'message' => '',
                ],
            ],
            'request_should_pass_when_message_is_provided' => [
                'pass' => true,
                'data' => [
                    'message' => Str::random(24),
                ],
            ],
        ];
    }

    protected function validate($requestData)
    {
        return $this->validator->make($requestData, $this->rules)->passes();
    }

    /**
     * @dataProvider validationProvider
     * @param bool $shouldPass
     * @param array $requestData
     */
    public function test_validation_results_as_expected($shouldPass, $requestData)
    {
        $this->assertEquals(
            $shouldPass,
            $this->validate($requestData)
        );
    }
}
