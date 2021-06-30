<?php

namespace App\Form;

use App\Entity\MessageChanel;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MessageChanelType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('content', TextareaType::class,  [
                'attr' => [
                    'class' => 'w-full bg-gray-300 py-5 px-3 rounded-xl',
                ],
                'label' => false,
            ])
        ;
    }
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => MessageChanel::class,
        ]);
    }
}
