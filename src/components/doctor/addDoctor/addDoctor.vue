<template>
    <div class="addDoctor">
      <span class="tittle">Añadir médico</span>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px" class="addForm">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Sexo" prop="sex">
          <el-radio class="radio" v-model="form.sex" label="man">Hombre</el-radio>
          <el-radio class="radio" v-model="form.sex" label="woman">Mujer</el-radio>
        </el-form-item>
        <el-form-item label="Fecha de ingreso" prop="date">
          <el-date-picker type="date" placeholder="Seleccione una fecha" v-model="form.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="Formación" prop="degree">
          <el-select v-model="form.degree" placeholder="Seleccione">
            <el-option label="Técnico superior" value="junior"></el-option>
            <el-option label="Grado" value="undergraduate"></el-option>
            <el-option label="Posgrado" value="postgraduate"></el-option>
            <el-option label="Doctorado" value="doctor"></el-option>
            <el-option label="Máster" value="master"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Especialidad" prop="major">
          <el-input v-model="form.major"></el-input>
        </el-form-item>
        <el-form-item label="Cargo" prop="profession">
          <el-input v-model="form.profession"></el-input>
        </el-form-item>
        <el-form-item label="Departamento" prop="office">
          <el-input v-model="form.office"></el-input>
        </el-form-item>
        <el-form-item class="buttonAdd">
          <el-button type="primary" @click="submitForm('form')">Añadir</el-button>
          <el-button type="danger" @click="resetForm ('form')">Restablecer</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          form: {
            name: '',
            sex: 'man',
            date: '',
            degree: '',
            major: '',
            profession: '',
            office: ''
          },
          // Validation rules
          rules: {
            name: [
              { required: true, message: 'Introduzca el nombre', trigger: 'blur' },
              { min: 2, max: 5, message: 'Entre 3 y 5 caracteres', trigger: 'blur' }
            ],
            sex: [
              { required: true, message: 'Seleccione el sexo', trigger: 'change' }
            ],
            date: [
              { type: 'date', required: true, message: 'Seleccione la fecha', trigger: 'blur' }
            ],
            degree: [
              { required: true, message: 'Seleccione la formación', trigger: 'change' }
            ],
            major: [
              { required: true, message: 'Indique la especialidad', trigger: 'blur' }
            ],
            profession: [
              { required: true, message: 'Indique el cargo', trigger: 'blur' }
            ],
            office: [
              { required: true, message: 'Indique el departamento', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        // Add method
        submitForm (form) {
        // Rule validation
          this.$refs[form].validate((valid) => {
            if (valid) {
        // Notification
              this.$message({
                showClose: true,
                message: '¡Añadido correctamente!',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '¡Error al añadir!',
                type: 'error'
              });
              return false;
            }
          });
        },
        // Reset method
        resetForm (form) {
          this.$refs[form].resetFields();
        }
      }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
.addDoctor .el-input
  width:100%
.addDoctor .el-date-editor,
.addDoctor .el-select
  width:100%
.addDoctor .tittle
  display:block
  text-align: center
  font-size:24px
  font-weight:600
  line-height:1.35
  margin-bottom:22px
.addDoctor .addForm
  width:100%
.addDoctor .addForm .buttonAdd
  margin-left:160px !important
  text-align:center

@media (max-width: 700px)
  .addDoctor .addForm
    .el-form-item__label
      width:130px !important
    .el-form-item__content
      margin-left:130px !important
  .addDoctor .addForm .buttonAdd
    margin-left:130px !important
</style>