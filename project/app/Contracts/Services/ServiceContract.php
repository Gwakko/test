<?php

namespace App\Contracts\Services;

use Illuminate\Database\Eloquent\Builder;

/**
 * Class Service
 * @package App\Services
 */
interface ServiceContract
{
    /**
     * Get the validation rules that apply to the input parameters.
     *
     * @return array
     */
    public function rules(): array;

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array;

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array;

    /**
     * Validate Input Data
     *
     * @param array $data Input data
     * @return array Validated data
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validate(array $data): array;

    /**
     * Create model
     *
     * @param array $data Input data
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(array $data);

    /**
     * Update model
     *
     * @param array $data Input data
     * @param int $id Model Id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(array $data, int $id);

    /**
     * Update model
     *
     * @param int $id Model Id
     * @return int
     */
    public function delete(int $id): int;

    /**
     * Find Model By Id
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function findById(int $id);

    /**
     * Get all
     *
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function all();
}
