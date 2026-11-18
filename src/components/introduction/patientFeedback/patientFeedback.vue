<template>
  <div class="patientFeedback">
    <h1 class="survey-title">Encuesta de satisfacción de pacientes del Hospital Anyi</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" class="survey-form">
      <div class="survey-dates">
        <el-form-item label="Fecha de la encuesta" prop="date1" required>
          <el-date-picker type="date" placeholder="Seleccione la fecha de la encuesta" v-model="ruleForm.date1"></el-date-picker>
        </el-form-item>
        <el-form-item label="Fecha de consulta" prop="date2" required>
          <el-date-picker type="date" placeholder="Seleccione la fecha de consulta" v-model="ruleForm.date2"></el-date-picker>
        </el-form-item>
      </div>
      <div class="survey-questions">
        <el-form-item label="Pregunta 1: ¿Cuál es su impresión general del hospital?" prop="answer1" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer1" :max="1">
            <el-checkbox label="checkbox1" name="answer">Satisfecho</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">Bastante satisfecho</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Insatisfecho</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 2: ¿Está satisfecho en general con la atención del personal del hospital?" prop="answer2" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer2" :max="1">
            <el-checkbox label="checkbox1" name="answer">Satisfecho</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">Bastante satisfecho</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Insatisfecho</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 3: ¿Está satisfecho con las técnicas diagnósticas y terapéuticas del hospital?" prop="answer3" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer3" :max="1">
            <el-checkbox label="checkbox1" name="answer">Satisfecho</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">Bastante satisfecho</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Insatisfecho</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 4: ¿Está satisfecho con el entorno de atención del hospital?" prop="answer4" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer4" :max="1">
            <el-checkbox label="checkbox1" name="answer">Satisfecho</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">Bastante satisfecho</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Insatisfecho</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 5: ¿Está satisfecho con las instalaciones del hospital?" prop="answer5" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer5" :max="1">
            <el-checkbox label="checkbox1" name="answer">Satisfecho</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">Bastante satisfecho</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Insatisfecho</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 6: ¿Cree que el hospital realiza cobros indebidos?" prop="answer6" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer6" :max="1">
            <el-checkbox label="checkbox1" name="answer">Sí</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">No</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Otros</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 7: Durante la consulta u hospitalización, ¿usted o sus familiares han invitado a comer al personal sanitario del hospital?" prop="answer7" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer7" :max="1">
            <el-checkbox label="checkbox1" name="answer">Sí</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">No</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Otros</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 8: ¿Cree que el hospital respeta y cuida a los pacientes, con un servicio proactivo, cordial, atento y educado?" prop="answer8" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer8" :max="1">
           <el-checkbox label="checkbox1" name="answer">Sí</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">No</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Otros</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 9: Cuando consulta al personal o presenta una queja, ¿el personal le atiende con cordialidad y le explica con paciencia?" prop="answer9" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer9" :max="1">
            <el-checkbox label="checkbox1" name="answer">Sí</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">No</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Otros</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 10: Durante la atención, ¿algún médico les ha evadido o rechazado a usted o a sus familiares?" prop="answer10" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer10" :max="1">
            <el-checkbox label="checkbox1" name="answer">Sí</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">No</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Otros</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Pregunta 11: ¿Cree que el hospital pone «al paciente en el centro de todo»?" prop="answer11" required class="survey-question">
          <el-checkbox-group v-model="ruleForm.answer11" :max="1">
            <el-checkbox label="checkbox1" name="answer">Sí</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">No</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">Otros</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="survey-actions">
        <el-button type="primary" @click="onSubmit('ruleForm')">Enviar</el-button>
        <el-button @click="resetForm('ruleForm')">Cancelar</el-button>
      </div>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        ruleForm: {
          date1: '',
          date2: '',
          answer1: [],
          answer2: [],
          answer3: [],
          answer4: [],
          answer5: [],
          answer6: [],
          answer7: [],
          answer8: [],
          answer9: [],
          answer10: [],
          answer11: []
        },
        rules: {
          date1: [
            { type: 'date', required: true, message: 'Seleccione la fecha', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: 'Seleccione la fecha', trigger: 'change' }
          ],
          answer1: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'blur' }
          ],
          answer2: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ],
          answer3: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ],
          answer4: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ],
          answer5: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ],
          answer6: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ],
          answer7: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ],
          answer8: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ],
          answer9: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ],
          answer10: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ],
          answer11: [
            { required: true, message: '  Seleccione solo una opción', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      onSubmit (formName) {
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
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      timeFormat () {
        let oldDate1 = this.ruleForm.date1;
        let oldDate2 = this.ruleForm.date2;
        let year1 = new Date(oldDate1).getFullYear();
        let month1 = new Date(oldDate1).getMonth() + 1;
        let day1 = new Date(oldDate1).getDate();
        let year2 = new Date(oldDate2).getFullYear();
        let month2 = new Date(oldDate2).getMonth() + 1;
        let day2 = new Date(oldDate2).getDate();
        let dateFormat1 = year1 + '-' + month1 + '-' + day1;
        let dateFormat2 = year2 + '-' + month2 + '-' + day2;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .patientFeedback
    max-width:100%

    .survey-title
      margin:0 0 24px
      color:#263b4d
      font-size:22px
      font-weight:600
      line-height:1.35

    .survey-dates
      display:grid
      grid-template-columns:repeat(2, minmax(0, 1fr))
      gap:20px
      margin-bottom:8px
      padding:18px
      border:1px solid #e4ebef
      border-radius:10px
      background:#f8fafb

      .el-form-item
        min-width:0
        margin:0 !important

      .el-form-item__label
        float:none
        width:100% !important
        padding:0 0 6px
        line-height:1.4
        text-align:left

      .el-form-item__content
        margin-left:0 !important

      .el-date-editor
        width:100%

    .survey-questions
      display:grid
      gap:12px

    .survey-question
      min-width:0
      margin:0 !important
      padding:16px 18px
      border:1px solid #e4ebef
      border-radius:10px
      background:#fff

      .el-form-item__label
        float:none
        width:100% !important
        padding:0 0 10px
        color:#34495e
        font-weight:600
        line-height:1.5
        text-align:left
        white-space:normal

      .el-form-item__content
        margin-left:0 !important

      .el-checkbox-group
        display:flex
        flex-wrap:wrap
        gap:8px 24px

      .el-checkbox
        margin:0

    .survey-actions
      display:flex
      justify-content:center
      gap:10px
      padding-top:20px

  @media (max-width: 600px)
    .patientFeedback
      .survey-title
        font-size:20px

      .survey-dates
        grid-template-columns:minmax(0, 1fr)
        gap:14px
        padding:14px

      .survey-question
        padding:14px

      .survey-question .el-checkbox-group
        gap:8px 16px
</style>