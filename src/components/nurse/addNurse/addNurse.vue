<template>
    <div class="nurse_form">
      <h1 class="form-page-title">Añadir enfermero(a)</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="108px" class="demo-ruleForm nurse-form-grid">
      <el-form-item label="Nombre" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Dirección" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="Edad" prop="age">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="Cargo" prop="position">
        <el-input v-model="ruleForm.position"></el-input>
      </el-form-item>
      <el-form-item label="Especialidad" prop="profession">
        <el-input v-model="ruleForm.profession"></el-input>
      </el-form-item>
      <el-form-item label="Departamento" prop="department">
        <el-select v-model="ruleForm.department" placeholder="Seleccione el departamento">
            <el-option label="Ginecología" value="women"></el-option>
            <el-option label="Pediatría" value="child"></el-option>
            <el-option label="Obstetricia" value="birth"></el-option>
            <el-option label="Urgencias" value="emergency"></el-option>
            <el-option label="Psiquiatría" value="spirit"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Formación" prop="education">
        <el-select v-model="ruleForm.education" placeholder="Seleccione la formación">
            <el-option label="Bachillerato técnico" value="technical"></el-option>
            <el-option label="Técnico superior" value="junior"></el-option>
            <el-option label="Grado universitario" value="undergraduate"></el-option>
            <el-option label="Máster" value="master"></el-option>
            <el-option label="Doctorado" value="doctor"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Fecha de ingreso" prop="date" required>
        <el-date-picker type="date" placeholder="Seleccione una fecha" v-model="ruleForm.date">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Sexo" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="Hombre"></el-radio>
          <el-radio label="Mujer"></el-radio>
        </el-radio-group>
      </el-form-item>     
      <el-form-item class="form-actions">
        <el-button type="primary" @click="submitForm('ruleForm')">Enviar</el-button>
        <el-button @click="resetForm('ruleForm')">Restablecer</el-button>
      </el-form-item>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        address: '',
        age: '',
        position: '',
        profession: '',
        department: '',
        education: '',
        sex: '',
        date: ''
      },
      rules: {
        name: [
          {required: true, message: 'Introduzca el nombre', trigger: 'blur'},
          {min: 2, max: 5, message: 'Entre 3 y 5 caracteres', trigger: 'blur'}
        ],
        address: [
          {required: true, message: 'Introduzca la dirección', trigger: 'blur'}
        ],
        age: [
          {required: true, message: 'Introduzca la edad', trigger: 'blur'}
          // {type: 'number', message: 'Age must be numeric'}
        ],
        position: [
          {required: true, message: 'Introduzca el cargo', trigger: 'blur'}
        ],
        profession: [
          {required: true, message: 'Introduzca la especialidad', trigger: 'blur'}
        ],
        department: [
          {required: true, message: 'Seleccione el departamento', trigger: 'change'}
        ],
        education: [
          {required: true, message: 'Seleccione la formación', trigger: 'change'}
        ],
        sex: [
          {required: true, message: 'Seleccione el sexo', trigger: 'change'}
        ],
        date: [
          {type: 'date', required: true, message: 'Seleccione la fecha de ingreso', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    // Submit
    submitForm (formName) {
      this.timeFormat();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '¡Enviado correctamente!',
            type: 'success'
          });
        } else {
          this.$message.error('Error al enviar, ¡vuelva a rellenarlo!');
          return false;
        }
      });
    },
    // Reset
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    timeFormat () {
      let oldDate = this.ruleForm.date;
      let year = new Date(oldDate).getFullYear();
      let month = new Date(oldDate).getMonth() + 1;
      let day = new Date(oldDate).getDate();
      let dateFormat = year + '-' + month + '-' + day;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.nurse-form-grid
  display:grid
  grid-template-columns:repeat(auto-fit, minmax(320px, 1fr))
  column-gap:24px

  .el-form-item
    min-width:0

  .el-select,
  .el-date-editor
    width:100%

  .form-actions
    grid-column:1 / -1

  .form-actions
    margin-top:4px
    text-align:right

@media (max-width: 480px)
  .nurse-form-grid
    grid-template-columns:minmax(0, 1fr)

    .el-form-item__label
      width:92px !important

    .el-form-item__content
      margin-left:92px !important
</style>
