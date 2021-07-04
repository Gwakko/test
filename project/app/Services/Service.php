<?php

namespace App\Services;

use App\Contracts\Services\ServiceContract;

/**
 * Class Service
 * @package App\Services
 */
abstract class Service implements ServiceContract
{
    /**
     * Get the validation rules that apply to the input parameters.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            //
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            //
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            //
        ];
    }

    /**
     * Validate Input Data
     *
     * @param array $data Input data
     * @return array Validated data
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validate(array $data): array
    {
        $validator = validator($data, $this->rules(), $this->messages(), $this->attributes());

        $validator->validate();

        return $validator->validated();
    }

    /**
     * Create model
     *
     * @param array $data Input data
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(array $data)
    {
        $data = $this->validate($data);

        return $this->model()->create($data);
    }

    /**
     * Update model
     *
     * @param array $data Input data
     * @param int $id Model Id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(array $data, int $id)
    {
        $data = $this->validate($data);

        $this->model()->where('id', $id)->update($data);

        return $this->findById($id);
    }

    /**
     * Update model
     *
     * @param int $id Model Id
     * @return int
     */
    public function delete(int $id): int
    {
        return $this->model()->where('id', $id)->delete();
    }

    /**
     * Find Model By Id
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null
     */
    public function findById(int $id)
    {
        return $this->model()->findOrFail($id);
    }

    /**
     * Find Model By Id
     * @return mixed
     */
    public function all()
    {
        return $this->model()->get();
    }
}
