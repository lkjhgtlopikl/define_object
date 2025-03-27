<script setup>


const props = defineProps({
    title: String,
    btn1: String,
    btn2: String,
    no: String,
    yes: String,
    ID: String

})
const emit = defineEmits(['sendno']);

function click() {
    emit('sendno',props.ID);
}
</script>

<template>

    <div class="modal" tabindex="-1" :id=ID>
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> Ваш объект {{ title }} ?
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" v-on:click="click" :data-bs-target="'#' + (parseInt(yes) + 1)">{{ btn1
                        }}</button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" :data-bs-target="'#' + (parseInt(no) + 1)">{{ btn2
                    }}</button>
                </div>
            </div>
        </div>
    </div>

</template>